import * as axios from "axios";

export default class Service {

  _apiKey = '&key=c611f34ad349ece5cad146e2684801ce29a6a122';
  _apiFNS = 'https://api-fns.ru/api/search?q=';
  // _corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
  // _corsAnywhere = 'https://crossorigin.me/';
  // _corsAnywhere = 'https://yacdn.org/proxy/';
  // _corsAnywhere = 'https://api.allorigins.win/get?url=';

  getResource = async (query) => {

    const res = await axios.get(`${this._apiFNS}${query}${this._apiKey}`, {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // return res.data.items[0].ЮЛ;
    console.log(res);
    // return res;
  }


  getCompany = async (name) => {
    const res = await this.getResource(name);

    return this._transformCompany(res);
  }

  _transformCompany = (company) => {

    return {
      // id: this._extractId(person),
      INN: company.ИНН,
      OGRN: company.ОГРН,
      FullName: company.НаимСокрЮЛ,
      Address: company.АдресПолн
    }
  }

  _apiKeyYandex = 'fbe27a07-f3ff-4ee7-b8a6-801e7e021216';

  _apiYandex = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${this._apiKeyYandex}&geocode=`;

  getСoordinates = async (query) => {

    const res = await axios.get(`${this._apiYandex}${query}`);

    // return res.data.items[0].ЮЛ;
    console.log(res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point);
    return res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;

  }

  getCoord = async (address) => {
    const res = await this.getСoordinates(address)
    console.log(res)
    return res;
  }

}
