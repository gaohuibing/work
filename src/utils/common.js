import { regionData } from "element-china-area-data";
const common = {
    /**
     * 区域code转中文
     * @param {xxx-xxx-xxx} data 
     */
    regionFormat(data) {
        if (data) {
            let arr = [];
            let paramsArr = data.split('-');
            regionData.map((province, index) => {
                if (province.value == paramsArr[0]) {
                    arr[0] = province.label;
                }
                let cityData = province.children;
                if (cityData && paramsArr.length > 1) {
                    cityData.map((city, cityIndex) => {
                        if (city.value == paramsArr[1]) {
                            arr[1] = city.label;
                        }
                        let distanceData = city.children;
                        if (distanceData && paramsArr.length > 2) {
                            distanceData.map((distance, distanceIndex) => {
                                if (distance.value == paramsArr[2]) {
                                    arr[2] = distance.label;
                                }

                            })
                        }
                    })
                }
            })
            return arr.join(' ');
        }


    },
    /**
     * 获取32位uuid
     */
    getuuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 32; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        var uuid = s.join("");
        return uuid;
    }
}
export default common