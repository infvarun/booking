const ITEM_ID = document.getElementById('item_id');
const ITEM_NAME = document.getElementById('item_name');

function itemFormSubmit() {
    const formObj = {};
    const itemID = generateUniqueID();
    const itemName = ITEM_NAME.value;
    const itemRadio = document.querySelector('input[name="itemRadio"]:checked').value;
    const itemPrice = document.getElementById('item_price').value;

    formObj.itemId = itemID;
    formObj.itemName = itemName;
    formObj.itemRadio = itemRadio;
    formObj.itemPrice = itemPrice;
    console.log(JSON.stringify(formObj));
    return (itemName) ? JSON.stringify(formObj) : false;
}

// Event handler for item save 
const saveitemDOM = document.getElementById('save_item');
saveitemDOM.addEventListener('click', ()=>{
    const formString = itemFormSubmit();
    console.log(formString);
    if(formString) {
        const formObj = JSON.parse(formString);
        saveitemDOM.style.display = 'none';
        document.getElementById('item_modal_body').innerHTML = `
        <div class="card border-success mb-3" id="item_success" style="max-width: 18rem; margin-right:auto; margin-left:auto;">
                <div class="card-header">
                    <h3 style="text-align:center; color: rgba(5, 102, 5, 0.74)">Item created successfully!!</h3>
                </div>
                <div class="card-body text-success">
                    <h5 class="card-title text-warning">${formObj.itemName}</h5>
                    <div class="card-text">
                        <table class="table table-sm">
                            <thead class="text-warning">
                                <tr>
                                    <th scope="col">Price</th>
                                    <th scope="col">${formObj.itemPrice}</th>
                                </tr>
                                <tr>
                                    <th scope="col">Status</th>
                                    <th scope="col">${formObj.itemRadio}</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>`;
        setTimeout(()=>{
            $('#item_success').addClass('animated jackInTheBox');
        }, 100);
    } else {
        ITEM_NAME.style.borderColor = '#dc3545';
        ITEM_NAME.focus();
        document.getElementById('item_name_error').innerHTML = `<i class="fas fa-exclamation-circle"></i> Please enter Item Name.`;
    }
});

// After modal is closed page will get reloaded
$('#itemModal').on('hidden.bs.modal', function (e) {
    document.location.reload();
});