import { LeadDto } from "@packages/customer-acquisition";

// TODO move to another file
const cpfFormatter = (cpf: string) => {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};

const useListLeadsPresenter = (leads: LeadDto[] | undefined) => {
  return leads
    ? leads.map((lead) => ({
      id: lead.id as string,
      fullName: lead.fullName.toUpperCase(),
      cpf: cpfFormatter(lead.cpf),
      email: lead.email.toLowerCase(),
      hasSomething: !!Math.round(Math.random()),
    }))
    : [];
};

export default useListLeadsPresenter;
