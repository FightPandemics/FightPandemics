class Location {
  constructor(googleMapsRes) {
    this.result = this.constructor.pickResult(googleMapsRes);
    if (Object.keys(this.result).length === 0) return;
    this.addressComponents = this.result.address_components;
    this.formattedAddress = this.result.formatted_address;
    this.geometry = this.result.geometry;
    this.coordinates = this.parseCoordinates();
    this.neighborhood = this.parseNeighborhood();
    this.city = this.parseCity();
    this.state = this.parseState();
    this.country = this.parseCountry();
    this.zip = this.parseZip();
  }

  static pickResult(res) {
    if (Array.isArray(res)) {
      // use 1st if array (geocode)
      // if ZERO_RESULT, return {}, consider throwing error?
      return res.length ? res[0] : {};
    }
    return res; // single result from place/details
  }

  parseCoordinates() {
    // #MongoDB requires in order [lng, lat]
    // See: https://docs.mongodb.com/manual/geospatial-queries
    return (
      this.geometry && [this.geometry.location.lng, this.geometry.location.lat]
    );
  }

  parseNeighborhood() {
    const neighborhood = this.addressComponents.find((ac) =>
      ac.types.some((t) => t === "neighborhood" || t === "sublocality"),
    );
    return neighborhood && neighborhood.short_name;
  }

  parseCity() {
    const city = this.addressComponents.find((ac) =>
      ac.types.some((t) => t === "locality" || t === "postal_town"),
    );
    return city && city.short_name;
  }

  parseState() {
    const state = this.addressComponents.find((ac) =>
      ac.types.some((t) => t === "administrative_area_level_1"),
    );
    return state && state.short_name;
  }

  parseCountry() {
    const country = this.addressComponents.find((ac) =>
      ac.types.some((t) => t === "country"),
    );
    return country && country.short_name;
  }

  parseZip() {
    const zip = this.addressComponents.find((ac) =>
      ac.types.some((t) => t === "postal_code"),
    );
    return zip && zip.short_name;
  }

  get toSubdocument() {
    if (Object.keys(this.result).length === 0) {
      return this.result;
    }
    const subdocument = {
      address: this.formattedAddress,
      coordinates: this.coordinates,
    };
    if (this.neighborhood) subdocument.neighborhood = this.neighborhood;
    if (this.city) subdocument.city = this.city;
    if (this.state) subdocument.state = this.state;
    if (this.country) subdocument.country = this.country;
    if (this.zip) subdocument.zip = this.zip;
    return subdocument;
  }
}

module.exports = Location;
