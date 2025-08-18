use async_graphql::Guard;

use crate::jwt::JWTClaims;

pub struct JWTGuard;

impl Guard for JWTGuard {
    async fn check(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<()> {
        if ctx.data_opt::<JWTClaims>().is_some() {
            Ok(())
        } else {
            Err("Forbidden".into())
        }
    }
}
