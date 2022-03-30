// Khi muốn truy cập 1 method trong Object nhưng chưa biết tên nên không
// thể dùng . để truy cập lúc ấy dùng [' tên method'] sẽ truy cập được

/*
    Ý NGHĨA KHI SORT:
    Dựa vào result để biết vị trí a và b: (3đk)
    Nếu result <0: a trước b
        result>0: b trước a.
       result =0 (kệ cmnđ).
    Thật ra sự khác nhau là ở chỗ:
     result=a-b hay
     result = b-a;
     chứ 3đk trên kia chỉ để xét khi chúng ta đã có result cụ thể.
*/

export const mapOrder = (array, order, key) => {
    if (!array || !order || !key) return [];

    array.sort((a, b) => {
        // CHECK:
        // console.log(a.key);
        // console.log(a[key]);
        return order.indexOf(a[key]) - order.indexOf(b[key]);
    });
    return array;
}