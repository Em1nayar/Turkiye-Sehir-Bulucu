const Search = document.getElementById("inputSearch");
const showIL = document.getElementById("showIl");
const body = document.body;

body.addEventListener('keydown', (e) => {
    Search.focus();
})

Search.addEventListener('input', () => {
    search(Search.value);
});

const search = async(searchText) => {
    const res = await fetch('state.json');
    const data = await res.json();
    
    let matches = data["data"].filter(data => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return data.il_adi.match(regex) || data.plaka_kodu.match(regex);
    });
    if (searchText.length === 0){
        matches = [];
    }
    addUI(matches);
}

const addUI= (city) => {
        // <li class="city-card">
        //         <div class="d-flex flex-column">
        //             <div class = "d-flex justify-content-between">
        //                 <h3>İl</h3>
        //                 <a class="toggle" style="font-size: 1.2rem;">+</a>
        //             </div>
        //             <div class="city-info">
        //                 <ul>
        //                     <li>
        //                         İlçeler
        //                     </li>
        //                 </ul>
        //                 <p>Nüfus</p>
        //                 <p>Plaka Kodu</p>
        //             </div>
        //         </div>
        //     </li>
        if (city.length > 0){
            console.log(city);
            const html = city.map(
                city => `
                <li class="city-card">
                        <div class="d-flex flex-column">
                            <div class = "d-flex justify-content-between">
                                <h3>${city.il_adi}</h3>
                                <a class="toggle" style="font-size: 1.2rem;">+</a>
                            </div>
                            <div class="city-info">
                                <ul>
                                    <li class = "d-flex flex-column">
                                        <p>${getIlceler(city)}</p>
                                    </li>
                                </ul>
                                <p style="margin-top : 1rem;">${city.nufus}</p>
                                <p style="margin-top : 1rem;">${city.plaka_kodu}</p>
                            </div>
                        </div>
                    </li>
                `
            ).join(' ');
            console.log(html);
            showIL.innerHTML = html;
        }
        else{
            showIL.innerHTML = ' ';
        }
}

const getIlceler = city => {
    var result = "";
    city.ilceler.forEach(element => {
        result += `<p style = "margin-top: 0.5rem;">${element.ilce_adi}</p>`;
    });
    return result;
}