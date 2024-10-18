import Coin from './coin/Coin';
import { useEffect, useState } from 'react';
import currencies from "./currencies.json";

export const Crypto= () => {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [rate, setRate] = useState(0);

    useEffect(() => {
        const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';
        // const apiUrl2 = "https://api.coinstats.app/public/v1/coins?skip=0";
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setCoins(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const fetchRate = async () => {
        try {
            const response = await fetch(`https://api.exchangeratesapi.io/v1/latest?access_key=7aa42ecd7b9ef84e368a9d99e450466e&symbols=USD,${currency}`);
            // const response = await axios.get(`https://api.currencylayer.com/live?access_key=&currencies=${currency}`);
            const result = await response.json(); // Log the entire response to understand the structure
            const rates = result.rates;
            console.log(rates); // Log the quotes to verify it's an object
            console.log(`USD${currency}`); // Log the key to ensure it's correct
            setRate(rates[`${currency}`]/rates["USD"]);
        } catch (error) {
            console.error('Error fetching the conversion rate:', error);
        }
    };
    if(currency!== undefined) {
        fetchRate();
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );
    const handleSelectFrom = (event) => {
        const { value } = event.target;
        setCurrency(value);
    };

    return (
        <>
            <div className="coin-app">
                <div className="search">
                    <div className={"title"}>
                        <div className={"space"}></div>
                        <h3 className='coin-text'>Search Coin</h3>
                        <div className={"space"}></div>
                    </div>
                    <div className={"title"}>
                        <div className={"space"}></div>
                        <form className={"coin-text"}>
                            <input
                                type="text"
                                className="coin-input"
                                placeholder="search"
                                onChange={handleChange}
                            />
                        </form>
                        <div className={"space"}></div>
                    </div>
                    <div className={"title"}>
                        <div className={"space"}></div>
                        <h3 className='coin-text'>Currency</h3>
                        <div className={"space"}></div>
                    </div>
                    <div className={"title"}>
                        <div className={"space"}></div>
                        <select className={"coin-text"} onChange={handleSelectFrom} value={currency}>
                            {Object.keys(currencies).map((currency, index) => (
                                <option value={currency} key={index}>
                                    {currency} - {currencies[currency].name}
                                </option>
                            ))}
                        </select>
                        <div className={"space"}></div>
                    </div>

                </div>
                {filteredCoins?.map((coin, index) => {
                    return (
                        <Coin
                            key={coin.id}
                            name={coin.name}
                            price={Math.round(coin.current_price * rate)}
                            symbol={coin.symbol}
                            marketcap={Math.round(coin.total_volume *rate)}
                            volume={Math.round(coin.market_cap * rate)}
                            image={coin.image}
                            priceChange={coin.price_change_percentage_24h}
                        />
                    );
                })}
            </div>
        </>
    );
}
