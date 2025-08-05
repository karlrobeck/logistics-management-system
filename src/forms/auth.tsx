import { withForm } from '@/components/ui/form';
import { AuthUsersInsert } from '@/db/schemas';

const LoginForm = withForm({
  defaultValues: {} as { email: string; password: string },
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="email">
          {(field) => <field.TextField label="Email" type="email" />}
        </form.AppField>
        <form.AppField name="password">
          {(field) => <field.TextField label="Password" type="password" />}
        </form.AppField>
      </>
    );
  },
});

const RegisterForm = withForm({
  defaultValues: {} as AuthUsersInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="name" type="text" />}
        </form.AppField>
        <form.AppField name="email">
          {(field) => <field.TextField label="email" type="email" />}
        </form.AppField>
        <form.AppField name="password">
          {(field) => <field.TextField label="password" type="password" />}
        </form.AppField>
      </>
    );
  },
});

export { LoginForm, RegisterForm };
