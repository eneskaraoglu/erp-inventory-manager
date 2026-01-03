import CustomerCard from "../../components/customer/cutomerCard";

function CustomerPager(){
    return(
        <div>
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Customer</h1>
                <CustomerCard key={1}
                id={1} name="Test" code="A100" adress="US Texsas" number="56100" vkno={123} onDelete={function (id: number): void {
                    throw new Error("Function not implemented.");
                } }/>
            </div>
        </div>
    )
}

export default CustomerPager