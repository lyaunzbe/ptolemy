'use strict';

//
// DEPRECATED. This is temporary until the skycatch projections api is set up
// NOTE This should only contain CRS data that cannot be found at epsg.io
//

module.exports =  {
  'LOCAL':
  { name: 'Arbitrary (m)',
    proj4: 'Arbitrary (m)',
    ogcwkt: 'LOCAL_CS["Arbitrary (m)",LOCAL_DATUM["Arbitrary datum"],UNIT["meter",1.0,AUTHORITY["EPSG","9001"]]]' },

  // Newly added... proj4 was created from the ogcwkt values... looks to be the same as the equivalent JGD2000 values
  // NOTE Could not use the OGCWKT from http://www.epsg-registry.org (for example http://www.epsg-registry.org/export.htm?wkt=urn:ogc:def:crs:EPSG::6675 )
  // without modification in Pix. Essentially ended up copying the OGCWKT value from 2449 with some changes.
  // proj4 values can be double checked here https://github.com/JuliaGeo/Proj4.jl/blob/master/gen/epsg
  'EPSG:6669':
   { name: 'JGD2011 / Japan Plane Rectangular CS I',
     ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS I",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",33],PARAMETER["central_meridian",129.5],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6669"],AXIS["Y",EAST],AXIS["X",NORTH]]',
     proj4: '+proj=tmerc +lat_0=33 +lon_0=129.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' },
  'EPSG:6670':
   { name: 'JGD2011 / Japan Plane Rectangular CS II',
     ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS II",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",33],PARAMETER["central_meridian",131],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6670"],AXIS["Y",EAST],AXIS["X",NORTH]]',
     proj4: '+proj=tmerc +lat_0=33 +lon_0=131 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs' },
  'EPSG:6671':
  { name: 'JGD2011 / Japan Plane Rectangular CS III',
    ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS III",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",36],PARAMETER["central_meridian",132.1666666666667],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6671"],AXIS["Y",EAST],AXIS["X",NORTH]]',
    proj4: '+proj=tmerc +lat_0=36 +lon_0=132.1666666666667 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' },
  'EPSG:6672':
  { name: 'JGD2011 / Japan Plane Rectangular CS IV',
    ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS IV",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",33],PARAMETER["central_meridian",133.5],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6672"],AXIS["Y",EAST],AXIS["X",NORTH]]',
    proj4: '+proj=tmerc +lat_0=33 +lon_0=133.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' },
  'EPSG:6673':
   { name: 'JGD2011 / Japan Plane Rectangular CS V',
     ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS V",GEOGCS["JGD2011",DATUM["Japanese_Geodetic_Datum_2000",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",36],PARAMETER["central_meridian",134.3333333333333],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6673"],AXIS["Y",EAST],AXIS["X",NORTH]]',
     proj4: '+proj=tmerc +lat_0=36 +lon_0=134.3333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' },
  'EPSG:6674':
   { name: 'JGD2011 / Japan Plane Rectangular CS VI',
     ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS VI",GEOGCS["JGD2011",DATUM["Japanese_Geodetic_Datum_2000",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",36],PARAMETER["central_meridian",136],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6674"],AXIS["Y",EAST],AXIS["X",NORTH]]',
     proj4: '+proj=tmerc +lat_0=36 +lon_0=136 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' },
  'EPSG:6675':
   { name: 'JGD2011 / Japan Plane Rectangular CS VII',
     ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS VII",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",36],PARAMETER["central_meridian",137.1666666666667],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6675"],AXIS["Y",EAST],AXIS["X",NORTH]]',
     proj4: '+proj=tmerc +lat_0=36 +lon_0=137.1666666666667 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' },
  'EPSG:6676':
   { name: 'JGD2011 / Japan Plane Rectangular CS VIII',
     ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS VIII",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",36],PARAMETER["central_meridian",138.5],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6676"],AXIS["Y",EAST],AXIS["X",NORTH]]',
     proj4: '+proj=tmerc +lat_0=36 +lon_0=138.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs' },
  'EPSG:6677':
  { name: 'JGD2011 / Japan Plane Rectangular CS IX',
    ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS IX",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",36],PARAMETER["central_meridian",139.8333333333333],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6677"],AXIS["Y",EAST],AXIS["X",NORTH]]',
    proj4: '+proj=tmerc +lat_0=36 +lon_0=139.8333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' },
  'EPSG:6678':
  { name: 'JGD2011 / Japan Plane Rectangular CS X',
    ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS X",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",40],PARAMETER["central_meridian",140.8333333333333],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6678"],AXIS["Y",EAST],AXIS["X",NORTH]]',
    proj4: '+proj=tmerc +lat_0=40 +lon_0=140.8333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' },
  'EPSG:6679':
   { name: 'JGD2011 / Japan Plane Rectangular CS XI',
     ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS XI",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",44],PARAMETER["central_meridian",140.25],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6679"],AXIS["Y",EAST],AXIS["X",NORTH]]',
     proj4: '+proj=tmerc +lat_0=44 +lon_0=140.25 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' },
  'EPSG:6680':
   { name: 'JGD2011 / Japan Plane Rectangular CS XII',
     ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS XII",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",44],PARAMETER["central_meridian",142.25],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6680"],AXIS["Y",EAST],AXIS["X",NORTH]]',
     proj4: '+proj=tmerc +lat_0=44 +lon_0=142.25 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' },
  'EPSG:6681':
   { name: 'JGD2011 / Japan Plane Rectangular CS XIII',
     ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS XIII",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",44],PARAMETER["central_meridian",144.25],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6681"],AXIS["Y",EAST],AXIS["X",NORTH]]',
     proj4: '+proj=tmerc +lat_0=44 +lon_0=144.25 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' },
  'EPSG:6682':
   { name: 'JGD2011 / Japan Plane Rectangular CS XIV',
     ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS XIV",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",26],PARAMETER["central_meridian",142],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6682"],AXIS["Y",EAST],AXIS["X",NORTH]]',
     proj4: '+proj=tmerc +lat_0=26 +lon_0=142 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' },
  'EPSG:6683':
   { name: 'JGD2011 / Japan Plane Rectangular CS XV',
     ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS XV",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",26],PARAMETER["central_meridian",127.5],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6683"],AXIS["Y",EAST],AXIS["X",NORTH]]',
     proj4: '+proj=tmerc +lat_0=26 +lon_0=127.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' },
  'EPSG:6684':
   { name: 'JGD2011 / Japan Plane Rectangular CS XVI',
     ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS XVI",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",26],PARAMETER["central_meridian",124],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6684"],AXIS["Y",EAST],AXIS["X",NORTH]]',
     proj4: '+proj=tmerc +lat_0=26 +lon_0=124 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' },
  'EPSG:6685':
   { name: 'JGD2011 / Japan Plane Rectangular CS XVII',
     ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS XVII",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",26],PARAMETER["central_meridian",131],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6685"],AXIS["Y",EAST],AXIS["X",NORTH]]',
     proj4: '+proj=tmerc +lat_0=26 +lon_0=131 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' },
  'EPSG:6686':
   { name: 'JGD2011 / Japan Plane Rectangular CS XVIII',
     ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS XVIII",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",20],PARAMETER["central_meridian",136],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6686"],AXIS["Y",EAST],AXIS["X",NORTH]]',
     proj4: '+proj=tmerc +lat_0=20 +lon_0=136 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' },
  'EPSG:6687':
   { name: 'JGD2011 / Japan Plane Rectangular CS XIX',
     ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS XIX",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",26],PARAMETER["central_meridian",154],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6687"],AXIS["Y",EAST],AXIS["X",NORTH]]',
     proj4: '+proj=tmerc +lat_0=26 +lon_0=154 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ' }
};
