import { withForm } from '@/components/ui/form';
import { CrmInvoicesInsert, CrmInvoicesUpdate } from '@/db/schemas';
import { CrmInvoiceStatus } from '@/db/types';

const CreateCrmInvoiceForm = withForm({
  defaultValues: {} as CrmInvoicesInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="invoiceNumber">
          {(field) => <field.TextField label="Invoice Number" type="text" />}
        </form.AppField>
        <form.AppField name="invoiceDate">
          {(field) => <field.TextField label="Invoice Date" type="date" />}
        </form.AppField>
        <form.AppField name="dueDate">
          {(field) => <field.TextField label="Due Date" type="date" />}
        </form.AppField>
        <form.AppField name="companyId">
          {(field) => <field.TextField label="Company ID" type="text" />}
        </form.AppField>
        <form.AppField name="contactId">
          {(field) => <field.TextField label="Contact ID" type="text" />}
        </form.AppField>
        <form.AppField name="subtotal">
          {(field) => <field.TextField label="Subtotal" type="number" />}
        </form.AppField>
        <form.AppField name="taxAmount">
          {(field) => <field.TextField label="Tax Amount" type="number" />}
        </form.AppField>
        <form.AppField name="totalAmount">
          {(field) => <field.TextField label="Total Amount" type="number" />}
        </form.AppField>
        <form.AppField name="currency">
          {(field) => <field.TextField label="Currency" type="text" />}
        </form.AppField>
        <form.AppField name="paymentTerms">
          {(field) => <field.TextField label="Payment Terms" type="text" />}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select invoice status"
              options={Object.values(CrmInvoiceStatus).map((status) => ({
                label: status.charAt(0).toUpperCase() + status.slice(1),
                value: status,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const UpdateCrmInvoiceForm = withForm({
  defaultValues: {} as CrmInvoicesUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="invoiceNumber">
          {(field) => <field.TextField label="Invoice Number" type="text" />}
        </form.AppField>
        <form.AppField name="invoiceDate">
          {(field) => <field.TextField label="Invoice Date" type="date" />}
        </form.AppField>
        <form.AppField name="dueDate">
          {(field) => <field.TextField label="Due Date" type="date" />}
        </form.AppField>
        <form.AppField name="companyId">
          {(field) => <field.TextField label="Company ID" type="text" />}
        </form.AppField>
        <form.AppField name="contactId">
          {(field) => <field.TextField label="Contact ID" type="text" />}
        </form.AppField>
        <form.AppField name="subtotal">
          {(field) => <field.TextField label="Subtotal" type="number" />}
        </form.AppField>
        <form.AppField name="taxAmount">
          {(field) => <field.TextField label="Tax Amount" type="number" />}
        </form.AppField>
        <form.AppField name="totalAmount">
          {(field) => <field.TextField label="Total Amount" type="number" />}
        </form.AppField>
        <form.AppField name="currency">
          {(field) => <field.TextField label="Currency" type="text" />}
        </form.AppField>
        <form.AppField name="paymentTerms">
          {(field) => <field.TextField label="Payment Terms" type="text" />}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select invoice status"
              options={Object.values(CrmInvoiceStatus).map((status) => ({
                label: status.charAt(0).toUpperCase() + status.slice(1),
                value: status,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

export { CreateCrmInvoiceForm, UpdateCrmInvoiceForm };
