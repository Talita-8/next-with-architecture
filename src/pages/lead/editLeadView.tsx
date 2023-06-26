import { LeadDto, UpdateLeadDto } from "@packages/customer-acquisition";
import { FormEvent, MouseEventHandler } from "react";

interface UpdateLeadProps {
  leads: {
    id: string;
    fullName: string;
    cpf: string;
    email: string;
    hasSomething: boolean;
  }[] | undefined;
  onSubmit: ((input: UpdateLeadDto) => Promise<void>) | undefined;
  refreshLeads?: (query?: string) => Promise<LeadDto[] | undefined>;
}

const EditLeadView = ({ leads, onSubmit, refreshLeads }: UpdateLeadProps) => {
  const handleOnClickButton = (event: MouseEventHandler<HTMLButtonElement>) => {
    event.currentTarget.nextElementSibling.style.display = event.currentTarget.nextElementSibling.style.display === 'none' ? 'flex' : 'none';
  };

  const handleUpdate = async (event: FormEvent<HTMLFormElement>, updateData: UpdateLeadDto) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newValue = formData.get("newValue") as string;
    updateData.value = newValue;
    onSubmit && onSubmit(updateData);
    refreshLeads && (await refreshLeads());
  }

  return (
    <>
      <h1>Edit Leads</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>CPF</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>{leads?.map(({ id, fullName, cpf, email }) => {
          return (
            <tr key={id}>
              <td>{fullName}
                <button onClick={handleOnClickButton}>
                  edit
                </button>
                <form style={{ display: 'none' }} onSubmit={(event) => handleUpdate(event, { id: id, property: 'fullName', value: '' })}>
                  <label> New value
                    <input name="newValue" />
                  </label>
                  <button type={"submit"}>Send</button>
                </form>
              </td>
              <td>{cpf}
                <button onClick={handleOnClickButton}>edit</button>
                <form style={{ display: 'none' }} onSubmit={(event) => handleUpdate(event, { id: id, property: 'cpf', value: '' })}>
                  <label> New value
                    <input name="newValue" />
                  </label>
                  <button type={"submit"}>Send</button>
                </form>
              </td>
              <td>{email}
                <button onClick={handleOnClickButton}>edit</button>
                <form style={{ display: 'none' }} onSubmit={(event) => handleUpdate(event, { id: id, property: 'email', value: '' })}>
                  <label> New value
                    <input name="newValue" />
                  </label>
                  <button type={"submit"}>Send</button>
                </form>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </>
  )
}

export default EditLeadView;
