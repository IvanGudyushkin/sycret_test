import PageCertificates from "../Pages/PageCertificates/PageCertificates";
import PageForm from "../Pages/PageForm/PageForm";
import PageDone from "../Pages/PageDone/PageDone";


export const InfoRoutes = [
    { path: '/', element: <PageCertificates/>},
    { path: '/form', element: <PageForm />},
    { path: '/done', element: <PageDone/>},
]