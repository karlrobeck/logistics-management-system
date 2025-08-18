pub mod drivers;
pub mod vehicles;

use async_graphql::{MergedObject, SimpleObject};

pub use drivers::{DriversMutation, DriversQuery};
pub use vehicles::{VehiclesMutation, VehiclesQuery};

pub mod prelude {
    pub use crate::drivers::*;
}

#[derive(SimpleObject, Default)]
pub struct Query {
    pub drivers: DriversQuery,
    pub vehicles: VehiclesQuery,
}

#[derive(Default, MergedObject)]
pub struct Mutation(DriversMutation, VehiclesMutation);
