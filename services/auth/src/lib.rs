use async_graphql::{MergedObject, SimpleObject};

use crate::{
    accounts::{AccountsMutation, AccountsQuery},
    session::{SessionsMutation, SessionsQuery},
    users::{UsersMutation, UsersQuery},
    verification::{VerificationMutation, VerificationQuery},
};

pub mod accounts;
pub mod session;
pub mod users;
pub mod verification;

#[derive(SimpleObject, Default)]
pub struct Query {
    accounts: AccountsQuery,
    sessions: SessionsQuery,
    users: UsersQuery,
    verification: VerificationQuery,
}

#[derive(Default, MergedObject)]
pub struct Mutation(
    AccountsMutation,
    SessionsMutation,
    UsersMutation,
    VerificationMutation,
);
