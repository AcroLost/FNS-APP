import * as axios from "axios";

export default class Service {

  _apiKey = '&key=6b3db91841a9d0fd03f501f21959b38e1179d606';
  _apiFNS = 'https://api-fns.ru/api/search?q=';
  // _corsAnywhere = 'https://cors-anywhere.herokuapp.com/';

  getResource = async (query) => {

    const res = await axios.get(`${this._apiFNS}${query}${this._apiKey}`, {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res);
    return res.data.items[0].ЮЛ;
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
      Address: company.АдресПолн,
      Status: company.Статус,
      Activity: company.ОснВидДеят
    }
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
