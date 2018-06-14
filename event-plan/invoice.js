
(function init() {
    populateCardHead();
})();

function populateCardHead() {
    const invoiceData = JSON.parse(localStorage.invoiceData);
    
    const cardHeadDOM = document.getElementById('card-head');
    const customerDOM = document.getElementById('cust_name');
    const custMailDOM = document.getElementById('cust_mail');
    const custPhoneDOM = document.getElementById('cust_phone');
    const custAddressDOM = document.getElementById('cust_address');

    cardHeadDOM.innerHTML = `<strong>Date:</strong> ${invoiceData.date}
                            <span class="float-right">
                                <strong>Invoice:</strong> ${invoiceData.invoiceNum}
                                <code> | </code>
                                <strong>Payment:</strong> ${invoiceData.payStatus}
                            </span>`;
    
    customerDOM.innerHTML = `<strong>${invoiceData.customer}</strong>`;

    custAddressDOM.innerHTML = `🏠 ${invoiceData.address}`;
    custMailDOM.innerHTML = `📧 ${invoiceData.mail}`;
    custPhoneDOM.innerHTML = `📞 ${invoiceData.phone}`;
}