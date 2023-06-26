import { useHomeController } from "@/modules/customer-acquisition";

import CreateLeadView from "./lead/createLeadView";
import ListLeadsView from "./lead/listLeadView";
import EditLeadView from "./lead/editLeadView";

export default function HomePage() {
  const [{ leads, error, loading }, { handleCreateLead, handleFilterLeads, handleUpdateLead }] =
    useHomeController();

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {error ? <div>{error}</div> : null}
      <CreateLeadView
        onSubmit={handleCreateLead}
        refreshLeads={handleFilterLeads}
      />
      {leads ? (
        <ListLeadsView
          leads={leads}
          onSearch={handleFilterLeads}
        />
      ) : null}

      {leads ? (
        <EditLeadView
          leads={leads}
          onSubmit={handleUpdateLead}
          refreshLeads={handleFilterLeads}
        />
      ) : null
      }
    </>
  );
}
