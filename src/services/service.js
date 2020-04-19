import * as axios from "axios";

export default class Service {

  _apiKey = '&key=c607048c10cc690371ed59eb73d962ad6fedacfb';
  _apiFNS = 'https://api-fns.ru/api/search?q=';
  // _corsAnywhere = 'https://cors-anywhere.herokuapp.com/';

  getCompany = async (query) => {

    const res = await axios.get(`${this._apiFNS}${query}${this._apiKey}`);
    console.log(res.data.items);

    return res.data.items;
  }

  verificationPartner = async (INN) => {

    const query = await axios.get(`https://api-fns.ru/api/check?req=${INN}${this._apiKey}`);

    return this._transformVerification(query.data.items[0].ЮЛ);
  }

  _transformVerification = (partner) => {

    return {
      Positive: partner.Позитив,
      Negative: partner.Негатив
    }
  }

  getStatement = async (INN) => {
    return `https://api-fns.ru/api/vyp?req=${INN}${this._apiKey}`;
  }

  getFullInformation = async (INN) => {

    const query = await axios.get(`https://api-fns.ru/api/egr?req=${INN}&key=${this._apiKey}`);

    return query.data.items[0].ЮЛ;
  }

  _apiKeyYandex = 'fbe27a07-f3ff-4ee7-b8a6-801e7e021216';

  _apiYandex = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${this._apiKeyYandex}&geocode=`;

  getСoordinates = async (query) => {

    const res = await axios.get(`${this._apiYandex}${query}`);

    return res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;

  }

  getCoord = async (address) => {
    const res = await this.getСoordinates(address)
    return res;
  }

}
