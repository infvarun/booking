
const base_url = 'http://localhost:8080/deo-api/public/';

let results = [];
let result = {};

class Booking {
    constructor(id,bookingid,customer,fromdate,todate,phone,total,paid,createdOn,status,address,mail) {
        this.id = id;
        this.bookingid = bookingid;
        this.customer =customer;
        this.fromdate = fromdate;
        this.todate = todate;
        this.phone = phone;
        this.total = total;
        this.paid = paid;
        this.createdOn = createdOn;
        this.status = status;
        this.address = address;
        this.mail = mail;
    }

}

const invoice = {
    invoiceNum : '',
    date : new Date(),
    customer : '',
    address : '',
    mail : '',
    phone : '',
    payStatus : '',
    items : [],
    halls : [],
    total : 0
}

async function getData(req_uri) {
    let data;
    try {
        const response = await axios.get(base_url+req_uri);
        data = response.data;
    } catch(e) {
        console.log(e);
    }
    
    return data;
}

async function getAll(uri) {
    results = [];
    const data = await getData(uri);
    results = data.map(element => {
        return element;
    });
}

async function getOne(uri) {
    result = {};
    const data = await getData(uri);
    result = data;
}

/**
 * Return static string with interpolated booking, for card start
 * @param {string} booking 
 */
function getBookingCardStart(booking) {
    return `
    <div class="col-md-4" id=${booking.bookingid}>
    <div class="card border-success mb-4 box-shadow" id="card-${booking.bookingid}">
    <p style="margin:10px 0 0 10px; text-align:left;"></p>
    <h5 style="margin:10px 0 0 10px; text-align:center;">${booking.status} ${booking.customer}</h5>
    <div class="card-body">
        <p class="card-text">
            <table class="table table-sm" id="${booking.bookingid}-table">
                <thead>
                    <tr>
                        <th scope="col">Booking Id</th>
                        <td scope="col">${booking.id}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>From</td>
                        <td>${booking.fromdate}</td>
                    </tr>
                    <tr>
                        <td>To</td>
                        <td>${booking.todate}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>${booking.phone}</td>
                    </tr>
                    <tr>
                        <td>Total Bill</td>
                        <td>${booking.total}</td>
                    </tr>
                    <tr>
                        <td>Paid</td>
                        <td>${booking.paid}</td>
                    </tr>
                </tbody>
            </table>
        </p>
        <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
                <a href="invoice.html" id="bill-${booking.id}" type="button" class="btn btn-sm btn-outline-primary">Bill</a>
                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                <button type="button" class="btn btn-sm btn-outline-danger">Delete</button>
            </div>
            <small class="text-muted">${booking.createdOn}</small>
        </div>
    </div>
    </div>
    </div>`;
}

/**
 * inititializer
 */
(function init() {
    //populateBookingInDOM();
    const res = testDOM();
    populateBookingInDOM(res);
})();

/**
 * Populate all bookings
 */
async function populateBookingInDOM(res) {
    const card = document.getElementById('calCard');
    await res.forEach((cur)=>{
        card.insertAdjacentHTML('beforeEnd', getBookingCardStart(cur));
        const billId = document.getElementById(`bill-${cur.id}`);
        billId.addEventListener('click', ()=>{
            setInvoice(cur);
        });
    });


}

/**
 * Set invoice object property from currently clicked booking
 * @param {Object} booking 
 */
function setInvoice(booking) {
    invoice.invoiceNum = booking.bookingid.replace(/[^a-zA-Z0-9]/g, ''); //remove all spcl char
    invoice.date = booking.createdOn;
    invoice.customer = booking.customer;
    invoice.address = booking.address;
    invoice.mail = booking.mail;
    invoice.phone = booking.phone;
    invoice.payStatus = ((booking.total - booking.paid) === 0) ? '<span class="badge badge-success">Paid</span>' : '<span class="badge badge-danger">Pending</span>'; 
    invoice.items = [];
    invoice.halls = [];
    invoice.total = 0;

    localStorage.invoiceData = JSON.stringify(invoice);
}


/**
 * Test function to test DOM componenets 
 */
function testDOM() {
    return [
        new Booking(101,'B-2018-june-11-12-04','Customer First','20-May-2018','22-May-2018','8861728005',200000, 150000,'June-11-2018','<span style="cursor:pointer" title="New">✔</span>', '301, 8th Cross Road Electronic city, Bangalore', 'cust0@gmail.com'),

        new Booking(102,'B-2018-june-11-12-05','Customer Sec','23-May-2018','25-May-2018','9061728555',500000, 250000,'June-08-2018','<span title="Over">✔</span>', '301, 8th Cross Road Electronic city, Bangalore', 'cust1@gmail.com'),

        new Booking(103,'B-2018-june-11-12-06','Customer Third','23-May-2018','25-May-2018','9061728555',200000, 200000,'June-08-2018','<span title="Over">✖</span>', '301, 8th Cross Road Electronic city, Bangalore', 'cust2@gmail.com'),

        new Booking(104,'B-2018-june-11-12-07','Obama One','22-May-2018','25-May-2018','9061728555',300000, 150000,'June-08-2018','<span title="Over">✔</span>', '301, 8th Cross Road Electronic city, Bangalore', 'cust3@gmail.com'),

        new Booking(105,'B-2018-june-11-12-08','Trump Trump','24-May-2018','25-May-2018','9061728555',50000, 10000,'June-08-2018','<span title="New">✖</span>', '301, 8th Cross Road Electronic city, Bangalore', 'cust4@gmail.com'), 

        new Booking(106,'B-2018-june-11-12-09','Varun Ved','28-May-2018','30-May-2018','9061728555',300000, 300000,'June-08-2018','<span title="New">✔</span>', '301, 8th Cross Road Electronic city, Bangalore', 'cust5@gmail.com'),

        new Booking(107,'B-2018-june-11-12-10','Selva Kumar','30-May-2018','02-June-2018','9061728555',60000,50000,'June-08-2018','<span title="New">✔</span>', '301, 8th Cross Road Electronic city, Bangalore', 'cust6@gmail.com'),

        new Booking(108,'B-2018-june-11-12-11','Navin Singh','23-May-2018','25-May-2018','9061728555',5000,5000,'June-08-2018', '<span title="Over">✖</span>', '301, 8th Cross Road Electronic city, Bangalore', 'cust8@gmail.com'),    
    ];
}

/**
 * Used for ID generation in sub-scripts
 */
function generateUniqueID() {
    const today = new Date();
    const date = today.getDate();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDay();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    const monthArray =  [
        'January',
        'February', 
        'March', 
        'April', 
        'May', 
        'June', 
        'July', 
        'August', 
        'September',
        'October', 
        'November', 
        'December'
    ];

    return `H-${year}-${monthArray[month]}-${date}-${hours}-${minutes}-${seconds}`;
}