import { withForm } from '@/components/ui/form';
import { CrmProductsInsert, CrmProductsUpdate } from '@/db/schemas';

const CreateCrmProductForm = withForm({
  defaultValues: {} as CrmProductsInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="Product Name" type="text" />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.TextField label="Description" type="text" />}
        </form.AppField>
        <form.AppField name="price">
          {(field) => <field.TextField label="Price" type="number" />}
        </form.AppField>
        <form.AppField name="sku">
          {(field) => <field.TextField label="SKU" type="text" />}
        </form.AppField>
      </>
    );
  },
});

const UpdateCrmProductForm = withForm({
  defaultValues: {} as CrmProductsUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="Product Name" type="text" />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.TextField label="Description" type="text" />}
        </form.AppField>
        <form.AppField name="price">
          {(field) => <field.TextField label="Price" type="number" />}
        </form.AppField>
        <form.AppField name="sku">
          {(field) => <field.TextField label="SKU" type="text" />}
        </form.AppField>
      </>
    );
  },
});

export { CreateCrmProductForm, UpdateCrmProductForm };
