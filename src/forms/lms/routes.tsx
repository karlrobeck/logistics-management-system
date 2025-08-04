import { withForm } from '@/components/ui/form';
import { LmsRoutesInsert, LmsRoutesUpdate } from '@/db/schemas';
import { LmsRouteStatus } from '@/db/types';

const CreateLmsRouteForm = withForm({
  defaultValues: {} as LmsRoutesInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="routeName">
          {(field) => <field.TextField label="Route Name" type="text" />}
        </form.AppField>
        <form.AppField name="routeDate">
          {(field) => <field.TextField label="Route Date" type="date" />}
        </form.AppField>
        <form.AppField name="driverId">
          {(field) => <field.TextField label="Driver ID" type="text" />}
        </form.AppField>
        <form.AppField name="vehicleId">
          {(field) => <field.TextField label="Vehicle ID" type="text" />}
        </form.AppField>
        <form.AppField name="estimatedDeparture">
          {(field) => (
            <field.TextField
              label="Estimated Departure"
              type="datetime-local"
            />
          )}
        </form.AppField>
        <form.AppField name="estimatedArrival">
          {(field) => (
            <field.TextField label="Estimated Arrival" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="actualDeparture">
          {(field) => (
            <field.TextField label="Actual Departure" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="actualArrival">
          {(field) => (
            <field.TextField label="Actual Arrival" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select route status"
              options={Object.values(LmsRouteStatus).map((status) => ({
                label: status
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
                value: status,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const UpdateLmsRouteForm = withForm({
  defaultValues: {} as LmsRoutesUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="routeName">
          {(field) => <field.TextField label="Route Name" type="text" />}
        </form.AppField>
        <form.AppField name="routeDate">
          {(field) => <field.TextField label="Route Date" type="date" />}
        </form.AppField>
        <form.AppField name="driverId">
          {(field) => <field.TextField label="Driver ID" type="text" />}
        </form.AppField>
        <form.AppField name="vehicleId">
          {(field) => <field.TextField label="Vehicle ID" type="text" />}
        </form.AppField>
        <form.AppField name="estimatedDeparture">
          {(field) => (
            <field.TextField
              label="Estimated Departure"
              type="datetime-local"
            />
          )}
        </form.AppField>
        <form.AppField name="estimatedArrival">
          {(field) => (
            <field.TextField label="Estimated Arrival" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="actualDeparture">
          {(field) => (
            <field.TextField label="Actual Departure" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="actualArrival">
          {(field) => (
            <field.TextField label="Actual Arrival" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select route status"
              options={Object.values(LmsRouteStatus).map((status) => ({
                label: status
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
                value: status,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

export { CreateLmsRouteForm, UpdateLmsRouteForm };
