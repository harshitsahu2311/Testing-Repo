import ProtectedLayout from "@/layout/ProtectedLayout";
import TicketsMainView from "./components/TicketsMainView";

function TicketsPage() {
  return (
    <ProtectedLayout>
      <div className="h-full overflow-y-auto">
        <TicketsMainView />
      </div>
    </ProtectedLayout>
  );
}

export default TicketsPage;
