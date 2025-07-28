import "./App.css";
import { useMutation, useQuery } from "../gqty/index";
import { CrmContactsInsert } from "./db/schemas";

const App = () => {
  const { crm } = useQuery();

  const [crmCreateContact] = useMutation<void, CrmContactsInsert>(
    (mutation, input) => {
      const createContact = mutation.createCrmContact({ payload: input });
    },
  );

  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      {crm.contacts.list({ page: 1, limit: 10 }).map((contact) => (
        <div key={contact.id} className="contact">
          <h2>
            {contact.firstName} {contact.lastName}
          </h2>
          <p>Email: {contact.email}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
