import { withForm } from '@/components/ui/form';
import {
  CrmOpportunityProductsInsert,
  CrmOpportunityProductsUpdate,
} from '@/db/schemas';

const CreateCrmOpportunityProductForm = withForm({
  defaultValues: {} as CrmOpportunityProductsInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="opportunityId">
          {(field) => <field.TextField label="Opportunity ID" type="text" />}
        </form.AppField>
        <form.AppField name="productId">
          {(field) => <field.TextField label="Product ID" type="text" />}
        </form.AppField>
        <form.AppField name="quantity">
          {(field) => <field.TextField label="Quantity" type="number" />}
        </form.AppField>
        <form.AppField name="unitPrice">
          {(field) => <field.TextField label="Unit Price" type="number" />}
        </form.AppField>
        <form.AppField name="totalPrice">
          {(field) => <field.TextField label="Total Price" type="number" />}
        </form.AppField>
      </>
    );
  },
});

const UpdateCrmOpportunityProductForm = withForm({
  defaultValues: {} as CrmOpportunityProductsUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="opportunityId">
          {(field) => <field.TextField label="Opportunity ID" type="text" />}
        </form.AppField>
        <form.AppField name="productId">
          {(field) => <field.TextField label="Product ID" type="text" />}
        </form.AppField>
        <form.AppField name="quantity">
          {(field) => <field.TextField label="Quantity" type="number" />}
        </form.AppField>
        <form.AppField name="unitPrice">
          {(field) => <field.TextField label="Unit Price" type="number" />}
        </form.AppField>
        <form.AppField name="totalPrice">
          {(field) => <field.TextField label="Total Price" type="number" />}
        </form.AppField>
      </>
    );
  },
});

export { CreateCrmOpportunityProductForm, UpdateCrmOpportunityProductForm };
