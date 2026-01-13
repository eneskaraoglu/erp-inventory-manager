import CustomerCard from "../../components/customer/CustomerCard";

function CustomerPage(){
    return(
        <div>
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Customer</h1>
                <CustomerCard 
                    key={1}
                    id={1} 
                    name="Test" 
                    email="test@example.com" 
                    phone="56100" 
                    address="US Texas" 
                    company="Test Company"
                    onDelete={(id: number): void => {
                        console.log("Delete customer:", id);
                    }}
                />
            </div>
        </div>
    )
}

export default CustomerPage