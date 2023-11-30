import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../stylesheet/variables';
import {isEmpty, debounce} from '../utils/util';
import {fetchPopularDrugs, searchDrugs} from '../services/searchbar';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../stylesheet/global';
import ImageButton from './Common/ImageButton';

const SearchBar = ({drugName}) => {
  const [drug, setDrug] = useState('');
  const [submitId, setSubmitId] = useState(0);
  const [isPopular, setISPopular] = useState();
  const [noDrugFound, setNoDrugFound] = useState();
  const [drugSearchResults, setDrugSearchResults] = useState([]);
  const [drugSuggestionDropdown, setDrugSuggestionDropdown] = useState(false);
  const getDrugsDelayedCallback = debounce(getDrugs, 500);
  const getonBlurHandlerForSearchBarCallback = debounce(
    blurHandlerForSearchBar,
    250,
  );
  const searchInput = useRef();
  const navigation = useNavigation();

  let isDirty = false;

  useEffect(() => {
    // setDrugValue(drugName);
  }, [drugName]);

  const setDrugValue = value => {
    // _.setCookie('drug', value, -1);
    setDrug(value);
  };

  function blurHandlerForSearchBar(event) {
    if (
      event &&
      event.relatedTarget &&
      event.relatedTarget.className.includes('clearButton')
    ) {
      setNoDrugFound(false);
    } else {
      //  setDrugSearchResults([]);
      // setDrugSuggestionDropdown(false);
      setNoDrugFound(false);
      setISPopular(false);
    }
  }

  function getDrugs(drugName) {
    isDirty = true;
    if (isEmpty(drugName)) {
      getPopularDrugs();
    } else {
      searchDrugs(drugName)
        .then(res => {
          console.log('res==>', res);
          if (res.length > 0) {
            setDrugSearchResults(res);
            setDrugSuggestionDropdown(true);
            setNoDrugFound(false);
            setISPopular(false);
          } else {
            setDrugSearchResults(res);
            setDrugSuggestionDropdown(false);
            setNoDrugFound(true);
            setISPopular(false);
          }
        })
        .catch(() => {
          setDrugSearchResults([]);
          setDrugSuggestionDropdown(false);
          setNoDrugFound(true);
          setISPopular(false);
        });
    }
  }

  const searchDrug = text => {
    setDrugValue(text);
    setDrugSearchResults([]);
    setDrugSuggestionDropdown(false);
    setISPopular(false);
    getDrugsDelayedCallback(text);
  };

  const searchDrugFocusHandle = () => {
    if (isEmpty(drug)) {
      getPopularDrugs();
    }
  };

  const setPopularDrugsAsResult = async () => {
    const drugSearchResults = await fetchPopularDrugs();
    if (!isEmpty(drugSearchResults)) {
      setDrugSearchResults(drugSearchResults);
      setDrugSuggestionDropdown(true);
      setISPopular(true);
      setNoDrugFound(false);
    }
  };

  const getPopularDrugs = () => {
    if (!isEmpty(drug) && isDirty) {
      setDrugValue(drug);
      getDrugsDelayedCallback(drug);
      return;
    }
    setPopularDrugsAsResult();
  };

  const handleSubmit = submitId => {
    //console.log("submitId, key, searchType",submitId, key, searchType)
    // Router.push(`/drug/${item.seoName}?q=${item.displayName}`)
    // Router.push(
    //   `/drug/${drugSearchResults[submitId].seoName}?q=${drugSearchResults[submitId].displayName}`
    // );
    let drugValue = drugSearchResults[submitId];

    // setISPageLoading && setISPageLoading(true);
    navigation.push('DrugDetails');
    blurHandlerForSearchBar();
  };
  // const handleSearchIconClick = () => {
  //   !isEmpty(submitId) && !isEmpty(drugSearchResults) && handleSubmit(submitId);
  // };
  //console.log('drugSearchResults==>', drugSearchResults);
  const clearSearchValue = () => {
    getPopularDrugs();
    setISPopular(true);
    setDrugValue('');
    searchInput.current.focus();
  };

  const handleSearchIconClick = () => {
    !isEmpty(submitId) && !isEmpty(drugSearchResults) && handleSubmit(submitId);
  };

  const renderItemList = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.push('DrugDetails', {url: item});
        setDrugSuggestionDropdown(false);
      }}>
      <Text style={styles.drugName}>{item.displayName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.outerSearchContainer}>
        <View style={styles.searchContainer}>
          <View
            style={[styles.searchInputContainer, globalStyles.whiteBackground]}>
            <Image
              source={require('../images/icon/search.jpg')}
              style={styles.searchIcon}
            />
            <TextInput
              ref={searchInput}
              value={drug}
              style={styles.searchInput}
              placeholder="Type your drug name"
              onChangeText={text => searchDrug(text)}
              onFocus={searchDrugFocusHandle}
              onBlur={getonBlurHandlerForSearchBarCallback}
              // onTouchStart={handleSearchBarClick}
            />
            {drug.length > 0 && (
              <ImageButton
                onPress={clearSearchValue}
                buttonStyle={styles.cancelContainer}
                imagePath={require('../images/icon/cancel.png')}
                imageStyle={styles.cancelIcon}
              />
            )}
          </View>
          <ImageButton
            onPress={() => handleSearchIconClick()}
            onBlur={getonBlurHandlerForSearchBarCallback}
            buttonStyle={styles.searchBtn}
            imagePath={require('../images/icon/search.jpg')}
            imageStyle={styles.searchBtnIcon}
          />
        </View>
      </View>
      {drugSuggestionDropdown && (
        <View
          style={[styles.outerFlatLIstContainer, globalStyles.whiteBackground]}>
          {isPopular && <Text style={styles.listTitle}>Popular Now</Text>}
          <FlatList
            data={drugSearchResults}
            renderItem={renderItemList}
            keyExtractor={item => item.seoName}
            ListEmptyComponent={() => (
              <Text>Please enter a valid drug name</Text>
            )}
            style={styles.flatListContainer}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {},
  outerSearchContainer: {
    backgroundColor: colors.darkViolet,
    padding: 10,
    // height: ,
    paddingHorizontal: '10%',
    paddingTop: '15%',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: colors.darkViolet,
    borderWidth: 1,
    borderRadius: 5,
  },
  searchInput: {
    width: '80%',
    height: 50,
  },
  searchIcon: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    paddingRight: 10,
    paddingLeft: -10,
  },
  outerFlatLIstContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  flatListContainer: {
    padding: 15,
  },
  drugName: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 10,
    color: colors.black,
  },
  listTitle: {
    color: colors.darkViolet,
    paddingHorizontal: 15,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: '700',
  },
  searchBtn: {
    height: 50,
    width: 60,
    backgroundColor: colors.darkPink,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnIcon: {
    height: 20,
    width: 20,
  },
  cancelContainer: {justifyContent: 'center', alignItems: 'center'},
  cancelIcon: {height: 20, width: 20, alignSelf: 'center'},
});
