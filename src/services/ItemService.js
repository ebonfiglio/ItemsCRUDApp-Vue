import Axios from "axios";
import {API} from "../shared/config";

class ItemService 
{
    async get(id) {
        try
        {
            var response = await Axios.get(`${API}item/${id}`);
            if(response.status === 200) return response.data;
            throw new Error("Error getting data from server.");
        }
        catch(error)
        {
            console.log(error);
            return null;
        }
    }

    async getAll() {
        try
        {
            var response = await Axios.get(`${API}item`);
            if(response.status === 200) return response.data;
            throw new Error("Error getting data from server.");
        }
        catch(error)
        {
            console.log(error);
            return null;
        }
    }

    async create(item){
        try
        {
            console.log(item);
            var response = await Axios.post(`${API}item`, {id:item.id, itemName: item.itemName, cost: item.cost},
            {headers: {"Content-Type": "application/json"}
            });
            
            if(response.status === 200) return response.data;
            throw new Error("Error creating item on server.");
        }
        catch(error)
        {
            console.log(error);
            console.log(response);
            return null;
        }

    }
    async delete(id) {
        try
        {
            var response = await Axios.delete(`${API}item/${id}`);
            if(response.status === 200) return response.status;
            throw new Error("Error deleting item on server.");

        }
        catch(error)
        {
                console.log(error);
                return response.status;
        }
    
    }
    async update(item) {
        try
        {
            var response = await Axios.put(`${API}item/${item.id}`, {itemName: item.itemName, cost: item.cost},
            {headers: {"Content-Type": "application/json"}
            });
            if(response.status === 200) return response.data;
            throw new Error("Error updating item on server.");
        }
        catch(error)
        {
            console.log(error);
            return null;
        }
    }
    async maxPricesOfItems() {
        
        try
        {
            var response = await Axios.get(`${API}item/MaxPrices`);
            if(response.status === 200) return response.data;
            throw new Error("Error getting data from server.");
        }
        catch(error)
        {
            console.log(error);
            return null;
        }
    }
    async maxPriceByItemName(itemName) {
        try
        {
            var response = await Axios.get(`${API}item/MaxPrice`, {params: {id:0, itemName: itemName, cost: 0}},
            {headers: {"Content-Type": "application/json"}
            });
            if(response.status === 200) return response.data;
            throw new Error("Error getting data from server.");
        }
        catch(error)
        {
            console.log(error);
            return null;
        }
    }
    
}
export default new ItemService();