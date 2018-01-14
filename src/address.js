const createAddress = place =>
  place.address_components
    .map(address => ({
      types: address.types,
      longName: address.long_name,
      shortName: address.short_name
    }))
    .reduce((acc, elem) => {
      elem.types.forEach(type => {
        acc[type] = {
          longName: elem.longName,
          shortName: elem.shortName
        };
      });

      return acc;
    }, {});

export default createAddress;
