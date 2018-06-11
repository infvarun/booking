
const base_url = 'http://localhost:8080/deo-api/public/';

let results = [];
let result = {};

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
    <div class="card border-info mb-4 box-shadow" id="card-${booking.bookingid}">
    <h5 style="margin:10px 0 0 10px; text-align:center;">${booking.customer}</h5>
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
                    <tr style="text-align:center">
                        <td>From</td>
                        <td>${booking.fromdate}</td>
                    </tr>
                    <tr style="text-align:center">
                        <td>To</td>
                        <td>${booking.todate}</td>
                    </tr>
                    <tr style="text-align:center">
                        <td>Phone</td>
                        <td>${booking.phone}</td>
                    </tr>
                    <tr style="text-align:center">
                        <td>Payment</td>
                        <td>${booking.payment}</td>
                    </tr>
                </tbody>
            </table>
        </p>
        <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-primary">Bill</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                <button type="button" class="btn btn-sm btn-outline-danger">Delete</button>
            </div>
            <small class="text-muted">9 mins</small>
        </div>
    </div>
    </div>
    </div>`;
}

/**
 * inititializer
 */
(function init() {
    getAll('bookings');
    results.forEach((cur)=>{
        console.log(cur);
    });
})();