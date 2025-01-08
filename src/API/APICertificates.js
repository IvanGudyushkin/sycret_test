import axios from "axios";

const APIkey = '011ba11bdcad4fa396660c2ec447ef14'
export async function getCertificates() {
        const response = await axios.get('https://sycret.ru/service/api/api', {
            params: {
                MethodName: 'OSGetGoodList',
                ApiKey: APIkey,
            },
        });
        return response.data;

}

export async function buyCertificates(certificate, formData) {
    const response = await axios.get('https://sycret.ru/service/api/api', {
        params:{
            MethodName: 'OSSale',
            ApiKey: APIkey,
            id:certificate.ID,
            TableName:certificate.TABLENAME,
            PrimaryKey:certificate.PRIMARYKEY,
            Price:certificate.PRICE,
            Summa:certificate.SUMMA,
            ClientName:formData.fullname,
            Phone:formData.phone,
            Email:formData.email,
            PaymentTypeId:2,
            UseDelivery:0,
            MsgText:formData.message,
        }
    });
    return response.data
}