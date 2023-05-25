import { axiosApiInstance } from "@/js/axios";
import store from "@/store/store";
import { f7 } from "framework7-vue";
import { showAlertError } from "./useHelpersFunctions";

export async function buyChest(chest_id, chest_amount, chest_name): Promise<any> {

    // f7.dialog.preloader("Creando trivia...");
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'post',
            url: '/api/auth/students/v3/user/chests/buy-chest',
            data: {
              id: chest_id,
              amount: chest_amount,
              name: chest_name
            },
        })
        // f7.dialog.close();
        return data;

    } catch (error) {
        f7.dialog.close();
        showAlertError('No se pudo comprar el cofre');
        console.log('No se pudo comprar el cofre:', error);
    }
}
