import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAppForm } from '@/components/ui/form';
import { authUsersSchema } from '@/db/schemas';
import { LoginForm } from '@/forms/auth';
import { useMutation } from '@/gqty';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const [login] = useMutation<void, { email: string; password: string }>(
    (mutation, inputs) => {
      const login = mutation.login(inputs);

      localStorage.setItem('auth-token', login.token);

      navigate({ to: '/' });
    },
  );

  const form = useAppForm({
    defaultValues: {} as { email: string; password: string },
    validators: {
      onChange: authUsersSchema.pick({ email: true, password: true }),
    },
    onSubmit: async ({ value }) => login({ args: value }),
  });

  return (
    <main className="h-screen flex justify-center items-center">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>Enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.AppForm>
              <LoginForm form={form} />
              <form.SubmitButton>Sign in</form.SubmitButton>
            </form.AppForm>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
