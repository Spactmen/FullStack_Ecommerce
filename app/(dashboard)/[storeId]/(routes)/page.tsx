import prismadb from "@/lib/prismadb"

interface DashboardPageProps {
    params:{ storeId : string }
}
const DashboardPage: React.FC<DashboardPageProps> = async({params}) => {

    const store = await prismadb.store.findFirst({
        where:{
            id: params.storeId
        }
    })
    return (
        <>
        <div>This is Dashboard</div>
        Active store  {store?.name}
        </>
    )
}

export default DashboardPage;