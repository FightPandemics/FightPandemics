function Place(name, place_id, type, formatted_phone_number, formatted_address, geometry, url, adr_address, business_status, international_phone_number, opening_hours, distance) {      
  this.name = name;
  this.place_id  = place_id;
  this.type = type;
  this.formatted_phone_number = formatted_phone_number || null;
  this.formatted_address = formatted_address || null;
  this.geometry = geometry || null;
  this.url = url || null;
  this.adr_address = adr_address || null;
  this.business_status = business_status || null;
  this.international_phone_number = international_phone_number || null;
  this.opening_hours = opening_hours || null;
  this.distance = distance || null;
}

Place.prototype.getName = function() { return this.name; }
Place.prototype.setName = function(name) { this.name = name; }

Place.prototype.getPlaceId = function() { return this.place_id; }
Place.prototype.setPlaceId = function(place_id) { this.place_id = place_id; }

Place.prototype.getType = function() { return this.type; }
Place.prototype.setType = function(type) { this.type = type; }

Place.prototype.getFormattedPhoneNumber = function() { return this.formatted_phone_number; }
Place.prototype.setFormattedPhoneNumber = function(formatted_phone_number) { this.formatted_phone_number = formatted_phone_number; }

Place.prototype.getFormattedAddress = function() { return this.formatted_address; }
Place.prototype.setFormattedAddress = function(formatted_address) { this.formatted_address = formatted_address; }

Place.prototype.getGeometry = function() { return this.geometry; }
Place.prototype.setGeometry = function(geometry) { this.geometry = geometry; }

Place.prototype.getUrl = function() { return this.url; }
Place.prototype.setUrl = function(url) { this.url = url; }

Place.prototype.getAdrAddress = function() { return this.adr_address; }
Place.prototype.setAdrAddress = function(adr_address) { this.adr_address = adr_address; }

Place.prototype.getBusinessStatus = function() { return this.business_status; }
Place.prototype.setBusinessStatus = function(business_status) { this.business_status = business_status; }

Place.prototype.getInternationalPhoneNumber = function() { return this.international_phone_number; }
Place.prototype.setInternationalPhoneNumber = function(international_phone_number) { this.international_phone_number = international_phone_number; }

Place.prototype.getOpeningHours = function() { return this.opening_hours; }
Place.prototype.setOpeningHours = function(opening_hours) { this.opening_hours = opening_hours; }

Place.prototype.getDistance = function() { return this.distance; }
Place.prototype.setDistance = function(distance) { this.distance = distance; }

Place.prototype.equals = function(otherPlace) {
  return otherPlace.getName() == this.getName()
    && otherPlace.getPlaceId() == this.getPlaceId()
    && otherPlace.getType() == this.getType()
    && otherPlace.getFormattedPhoneNumber() == this.getFormattedPhoneNumber()
    && otherPlace.getFormattedAddress() == this.getFormattedAddress()
    && otherPlace.getGeometry() == this.getGeometry()
    && otherPlace.getUrl() == this.getUrl()
    && otherPlace.getAdrAddress() == this.getAdrAddress()
    && otherPlace.getBusinessStatus() == this.getBusinessStatus()
    && otherPlace.getInternationalPhoneNumber() == this.getInternationalPhoneNumber()
    && otherPlace.getOpeningHours() == this.getOpeningHours()
    && otherPlace.getDistance() == this.getDistance();
}

Place.prototype.fill = function(newFields) {
  for (let field in newFields) {
    if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
      if (this[field] !== "undefined") {
        this[field] = newFields[field];
      }
    }
  }
};

module.exports = Place;