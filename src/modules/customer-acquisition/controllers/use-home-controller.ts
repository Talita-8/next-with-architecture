import {
  useUpdateLead,
  useCreateLead,
  useFilterLeads,
  useListLeadsPresenter,
} from "@/modules/customer-acquisition";
import { FilterDto } from "@packages/customer-acquisition";
import { useState } from "react";

const useHomeController = () => {
  const [filter, setFilter] = useState<FilterDto>({
    query: undefined,
    offset: 0,
    limit: 1000,
  });
  const [
    _handleFilterLeads,
    { data: leads, error: leadError, loading: leadLoading },
  ] = useFilterLeads(filter);

  const [
    handleCreateLead,
    { error: createLeadError, loading: createLeadLoading },
  ] = useCreateLead();

  const [
    handleUpdateLead, 
    { error: updateLeadError, loading: updateLeadLoading }
  ] = useUpdateLead();
  
  const error = leadError || createLeadError;
  const loading = leadLoading || createLeadLoading;

  const handleFilterLeads = async (query?: string) => {
    setFilter((prevFilter) => ({ ...prevFilter, query }));
    return await _handleFilterLeads();
  };

  return [
    {
      leads: useListLeadsPresenter(leads),
      error,
      loading,
    },
    {
      handleCreateLead,
      handleFilterLeads,
      handleUpdateLead, 
    },
  ];
};

export default useHomeController;
