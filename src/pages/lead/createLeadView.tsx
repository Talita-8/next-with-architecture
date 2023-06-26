import { CreateLeadDto, LeadDto } from "@packages/customer-acquisition";
import { FormEvent } from "react";

interface CreateLeadViewProps {
  onSubmit?: (data: CreateLeadDto) => Promise<void>;
  refreshLeads?: (query?: string) => Promise<LeadDto[] | undefined>;
}

const CreateLeadView = ({ onSubmit, refreshLeads }: CreateLeadViewProps) => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as CreateLeadDto;
    onSubmit && (await onSubmit(data));
    refreshLeads && (await refreshLeads());
  };

  return (
    <div>
      <h1>Create Lead</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Full name
          <input name={"fullName"} />
        </label>
        <label>
          CPF
          <input name={"cpf"} />
        </label>
        <label>
          E-mail
          <input name={"email"} />
        </label>
        <button type={"submit"}>Criar</button>
      </form>
    </div>
  );
};

export default CreateLeadView;
