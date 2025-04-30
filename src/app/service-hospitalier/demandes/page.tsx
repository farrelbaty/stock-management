import { MesDemandesList } from "@/features/h-service/presentation/MesDemandesList2";

const HospitalDemandPage = () => {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Demandes du service</h1>
      </div>
      <MesDemandesList />
    </div>
  );
};

export default HospitalDemandPage;
