import * as axios from "axios";

const _apiKey = '&key=28ee5ed0c60169dc4de6a13d9ea21cf235e868c7',
  _apiFNS = 'https://api-fns.ru/api/search?q=';
// _corsAnywhere = 'https://cors-anywhere.herokuapp.com/';

export const apiFNS = {

  async getCompany(query) {

    const res = await axios.get(`${_apiFNS}${query}${_apiKey}`);
    return res.data.items;
  },

  async verificationPartner(INN) {

    const query = await axios.get(`https://api-fns.ru/api/check?req=${INN}${_apiKey}`);
    return _transformVerification(query.data.items[0].ЮЛ || query.data.items[0].ИП);
  },

  async getStatement(INN) {

    return `https://api-fns.ru/api/vyp?req=${INN}${_apiKey}`;
  },

  async getFullInformation(INN) {

    const query = await axios.get(`https://api-fns.ru/api/egr?req=${INN}&key=${_apiKey}`);
    return query.data.items[0].ЮЛ || query.data.items[0].ИП;
  }
}

const _transformVerification = (partner) => {

  return {
    Positive: partner.Позитив,
    Negative: partner.Негатив
  }
}

const _apiKeyYandex = 'fbe27a07-f3ff-4ee7-b8a6-801e7e021216',
  _apiYandex = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${_apiKeyYandex}&geocode=`;

export const apiYandex = {

  async getСoordinates(query) {

    const res = await axios.get(`${_apiYandex}${query}`);
    return res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
  }
}
