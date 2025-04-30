import { FromHospitalCommandList } from "@/features/suppliers/presentation/FromHospitalCommandList";

const SupplierCommandPage = () => {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Demandes reçues</h1>
      </div>
      <FromHospitalCommandList />
    </div>
  );
};

export default SupplierCommandPage;
