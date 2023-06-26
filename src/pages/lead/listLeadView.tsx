import { LeadDto } from "@packages/customer-acquisition";
import { FormEvent } from "react";

interface ListLeadsProps {
  leads: {
    id: string;
    fullName: string;
    cpf: string;
    email: string;
    hasSomething: boolean;
  }[];
  onSearch?: (query?: string) => Promise<LeadDto[] | undefined>;
}

const ListLeadsView = ({ leads, onSearch }: ListLeadsProps) => {
  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSearch && (await onSearch(formData.get("search") as string));
  };

  return (
    <div>
      <h1>List Leads</h1>
      <form onSubmit={handleSearch}>
        <label>
          Search
          <input name={"search"} />
        </label>
        <button type={"submit"}>Search</button>
      </form>
      <table border={1}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>CPF</th>
            <th>E-mail</th>
            <th>Has something</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(({ id, fullName, cpf, email, hasSomething }) => (
            <tr key={id}>
              <td>{fullName}</td>
              <td>{cpf}</td>
              <td>{email}</td>
              <td>{hasSomething ? "Yes" : null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListLeadsView;
