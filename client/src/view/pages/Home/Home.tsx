import {Component} from "react";
import axios from 'axios';

import {Product} from "../../common/Product/Product";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export class Home extends Component {
    private api: any;
    constructor(props: {}) {
        super(props);
        this.api = axios.create({
            baseURL: `http://localhost:4000`
        });
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData = async () => {
        try {
            // let response = await fetch('./product-data.json');
            // let jsonData = await response.json();
            this.api
                .get('/products/all')
                .then((res: { data: any }) => {
                    const jsonData = res.data;
                    this.setState({data: jsonData});
                }).catch((error: any) => {
                console.error("Axios Error:", error);
            });
        } catch (error) {
            console.error(
                'Error fetching data:',
                error);
        }
    }

    render() {
        // @ts-ignore
        const {data} = this.state;
        return (
            <div className="flex">
                {/*Row 01  */}
                <div className="flex
                               flex-wrap
                               ml-[1px]
                               mt-10
                               mb-5
                               justify-center
                               items-center
                               mx-auto">
                    {
                        data.map((product: any) => (
                            <Product key={product.id}
                                     data={product}/>
                        ))
                    }
                </div>
            </div>
        );
    }
}
