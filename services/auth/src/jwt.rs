use std::collections::BTreeMap;

use chrono::{DateTime, Utc};
use hmac::Hmac;
use jwt::{SignWithKey, VerifyWithKey};
use serde::{Deserialize, Serialize};
use sha2::Sha256;

#[derive(Deserialize, Serialize, Debug, Clone, PartialEq, Eq)]
pub struct JWTClaims {
    pub sub: String,
    pub exp: DateTime<Utc>,
    pub iss: String,
    pub aud: String,
    pub nbf: DateTime<Utc>,
    pub iat: DateTime<Utc>,
    pub jti: String,
    #[serde(flatten)]
    pub claims: BTreeMap<String, String>,
}

impl JWTClaims {
    pub fn sign(&self, key: &Hmac<Sha256>) -> Result<String, jwt::Error> {
        self.sign_with_key(key)
    }

    pub fn decode(token: &str, key: &Hmac<Sha256>) -> Result<Self, jwt::Error> {
        let default_skew = chrono::Duration::seconds(30);
        Self::decode_with_skew(token, key, default_skew)
    }

    pub fn decode_with_skew(
        token: &str,
        key: &Hmac<Sha256>,
        skew: chrono::Duration,
    ) -> Result<Self, jwt::Error> {
        let claims: Self = token.verify_with_key(key)?;

        let now = Utc::now();

        if now > claims.exp + skew {
            return Err(jwt::Error::Format);
        }

        if now < claims.nbf - skew {
            return Err(jwt::Error::Format);
        }

        Ok(claims)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::{Duration, Utc};
    use hmac::Hmac;
    use sha2::Sha256;

    fn make_key() -> Hmac<Sha256> {
        <Hmac<Sha256> as hmac::Mac>::new_from_slice(b"test-secret").expect("valid key")
    }

    fn make_claims_with_offsets(exp_offset_secs: i64, nbf_offset_secs: i64) -> JWTClaims {
        let now = Utc::now();
        JWTClaims {
            sub: "test-sub".to_string(),
            exp: now + Duration::seconds(exp_offset_secs),
            iss: "test-iss".to_string(),
            aud: "test-aud".to_string(),
            nbf: now + Duration::seconds(nbf_offset_secs),
            iat: now,
            jti: "test-jti".to_string(),
            claims: std::collections::BTreeMap::new(),
        }
    }

    #[test]
    fn decode_valid_token() {
        let key = make_key();
        let claims = make_claims_with_offsets(60, -60);
        let token = claims.sign(&key).expect("sign");

        let decoded = JWTClaims::decode_with_skew(&token, &key, Duration::seconds(30));
        assert!(decoded.is_ok(), "valid token should decode");
    }

    #[test]
    fn decode_expired_token() {
        let key = make_key();
        // expired 60s ago
        let claims = make_claims_with_offsets(-60, -120);
        let token = claims.sign(&key).expect("sign");

        let decoded = JWTClaims::decode_with_skew(&token, &key, Duration::seconds(30));
        assert!(decoded.is_err(), "expired token should fail");
    }

    #[test]
    fn decode_not_yet_valid_token() {
        let key = make_key();
        // nbf in 60s
        let claims = make_claims_with_offsets(120, 60);
        let token = claims.sign(&key).expect("sign");

        let decoded = JWTClaims::decode_with_skew(&token, &key, Duration::seconds(30));
        assert!(decoded.is_err(), "not-yet-valid token should fail");
    }

    #[test]
    fn decode_within_skew() {
        let key = make_key();
        // expired 10s ago, within 30s skew
        let claims = make_claims_with_offsets(-10, -120);
        let token = claims.sign(&key).expect("sign");

        let decoded = JWTClaims::decode_with_skew(&token, &key, Duration::seconds(30));
        assert!(
            decoded.is_ok(),
            "token expired within skew should still decode"
        );
    }

    #[test]
    fn nbf_within_skew() {
        let key = make_key();
        // nbf in 10s, within 30s skew
        let claims = make_claims_with_offsets(120, 10);
        let token = claims.sign(&key).expect("sign");

        let decoded = JWTClaims::decode_with_skew(&token, &key, Duration::seconds(30));
        assert!(decoded.is_ok(), "nbf within skew should still decode");
    }
}
