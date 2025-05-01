// app/service-hospitalier/[serviceId]/demandes/page.tsx

import { MesDemandesList } from "@/features/h-service/presentation/MesDemandesList2";
import { getServicesOrdersUseCase } from "@/lib/usecases/ordersUseCases";

type Props = {
  params: Promise<{
    serviceId: string;
  }>;
};

export default async function HospitalDemandPage(props: Props) {
  const params = await props.params;
  const { serviceId } = params;

  const demands = await getServicesOrdersUseCase.execute(serviceId);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Demandes du service</h1>
      </div>
      <MesDemandesList demands={demands} serviceId={serviceId} />
    </div>
  );
}
