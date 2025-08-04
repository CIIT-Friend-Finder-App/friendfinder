import { View, Text, ScrollView, StyleSheet, PanResponder, Pressable, StyleProp, ViewStyle } from 'react-native';
import { Animated } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRef, useState, useEffect } from 'react';
export default function Notifications() {
  const initialCards = [
    { 
    id: 1, 
    nickname: 'Day', 
    age: 21, 
    bio: 'erm erm erm erm erm erm erm', about: ['She/Her', 'Second Year', 'BMMA - Graphic Design'], 
    interests: 'Infinity Nikki, Valo, Gamble sa Gacha games', 
    hobbies: 'kms', 
    lookingFor: 'Study buddy' 
    },
    { 
    id: 2, 
    nickname: 'Yohan', 
    age: 18, 
    bio: 'spending habits', about: ['They/Them', 'Second Year', 'BMMA - Graphic Design'], 
    interests: 'spend, spend on food, spend on merch, say yes to spending', 
    hobbies: 'spend', 
    lookingFor: 'food buddy, shopping buddy' 
    },
    { 
    id: 3, 
    nickname: 'Lili', 
    age: 20, 
    bio: 'i cant do this anymore please end this misery', about: ['She/Her', 'Second Year', 'BMMA - Graphic Design'], 
    interests: 'cats, dogs, cheat on my dogs with stray cats and dogs, gamble on gacha, spend all my net worth on food', 
    hobbies: 'valo, genshin, watch random stuff, fangirl blackpink', 
    lookingFor: 'Study buddy' 
    },
    { 
    id: 4, 
    nickname: 'Gem', 
    age: 23, 
    bio: 'i sound drunk all the time but i swear im sober', about: ['He/Him', 'Second Year', 'BMMA - Graphic Design'], 
    interests: 'dana', 
    hobbies: 'dana', 
    lookingFor: 'dana' 
    },
    {
    id: 5, 
    nickname: 'Tyrieffy', 
    age: 23, 
    bio: 'hahaHAHSHAHAHHAHAHAH burn everything', about: ['She/Her', 'Second Year', 'BMMA - Graphic Design'], 
    interests: 'goon over gacha characters and gamblle for them', 
    hobbies: 'goon, workout, crashout and make things harder for me (software engr), goon', 
    lookingFor: 'Study buddyddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd' 
    },
    {
    id: 6, 
    nickname: 'moimoi', 
    age: 22, 
    bio: 'play aroun valo enemies as if im playing with cockroach lives', about: ['She/Her', 'Second Year', 'BMMA - Graphic Design'], 
    interests: 'valo, hotdog sinigang', 
    hobbies: 'valo', 
    lookingFor: 'Study buddy' 
    },
  ];

  const [cards, setCards] = useState(initialCards);
  const pan = useRef(new Animated.ValueXY()).current; /* to track finger position, aligned with the animation */
  const opacity = useRef(new Animated.Value(1)).current; /* fade effect */
  const isSwiping = useRef(false); /* tracks if swiping is currently happening. to avoid overlapping swipes */

  const likeOpacity = pan.x.interpolate({ /* for like icon to appear when certain x is reached */
    inputRange: [50, 150], /* opacity 0-1 between x ranges 50-150 */
    outputRange: [0, 1],
    extrapolate: 'clamp', /* to ensure opacity stays 0 before 50, and 1 after 150 */
  });

  const nopeOpacity = pan.x.interpolate({ /* for x icon to appear when certain x is reached */
    inputRange: [-150, -50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => { /* useEffect basically prepares the state of the next card after swiping previous card. array changes.*/
    isSwiping.current = false; /* isSwiping set to false, meaning it tells the program that there is no swiping currently happening, so that users are able to swipe na */
    pan.setValue({ x: 0, y: 0 }); /* ensures card position is back to center */
    opacity.setValue(1); /* ensure opacity of next card to swipe is 1 */
  }, [cards]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isSwiping.current, /* when !isSwiping.current is !false = true, then onStartShouldSetPanResponder allows swiping. otherwise, swiping is blocked. onSTartShouldSetPanResponder when triggered, is only a decision whether to allow swiping or not*/
      onPanResponderGrant: () => {
        isSwiping.current = true;  /* lock isSwiping to true while onPanResponderGrant is activated. so that walang double swipes. */
      },
      onPanResponderMove: Animated.event( /* every time user moves their finger, update the card's pan.x and pan.y values, so that the animation will follow through */
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false } /*set to false since Native Driver only works for transform and opacity*/
      ),
      onPanResponderRelease: (_, gestureState) => { /* function receives gestureState to tell how far user swiped  */
        if (gestureState.dx > 80) {
          swipeRight(); /* if gestureState x swipe is more than 100 pixels to the right, it is a swipe right or like */
        } else if (gestureState.dx < -80) {
          swipeLeft(); /* same lang */
        } else { /* if swipe was too small (does not reach 100 or -100 pixels) */
          Animated.spring(pan, { 
            toValue: { x: 0, y: 0 }, /* animate card back to ceter */
            useNativeDriver: true, /* for smoother animation, para hindi nakabase animation sa JS thread which is slow and skips frames */
          }).start(() => {
            isSwiping.current = false; /* after animation ends, reset isSwiping to false */
          });
        }
      },
      onPanResponderTerminate: () => {
        isSwiping.current = false; /* resets swiping state if ever user is in the middle of swiping but gets interrupted,, eg phone call */
      },
    })
  ).current;

  const swipeRight = () => {
    Animated.parallel([ /* to run all these animations at the same time */
      Animated.timing(pan, { /* to move to the right */
        toValue: { x: 500, y: 0 },
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, { /* fade effect */
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      removeTopCard(); /* after animation finishes, does this function. remove the card from the deck */
    });
  };

  const swipeLeft = () => {
    Animated.parallel([
      Animated.timing(pan, {
        toValue: { x: -500, y: 0 },
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      removeTopCard();
    });
  };

  const removeTopCard = () => {
    setCards(prev => prev.slice(1)); /* removeTopCard function. to remove first card in card list array. this updates the state using setCards */
  };

  const renderCard = (card, index) => {
    const isTopCard = index === 0; // to check if its top card

    const animatedStyle = isTopCard // animation style
      ? { transform: [{ translateX: pan.x }, { translateY: pan.y }], opacity } // if top card, swipe movement and fade effect
      : { transform: [{ translateY: index * -5 }] } as StyleProp<ViewStyle>; // if not top card, desk stack appearance

    return (
      <Animated.View
        key={card.id} 
        style={[styles.card, animatedStyle, { zIndex: cards.length - index }]}  // card styles, yung animation styles, as well as z index to ensure top card is always on top VISUALLY
        {...(isTopCard ? panResponder.panHandlers : {})} // only top card gets panresponder and panhandlers so its the only one that can be dragged
      >
        <Text style={styles.nickname}>
          {card.nickname}, <Text style={styles.age}>{card.age}</Text>
        </Text>

        <View style={styles.bioContain}>
          <Text style={styles.bio}>{card.bio}</Text>
        </View>

        <Text style={styles.labels}>About Me</Text>
        <View style={styles.aboutmecontain}>
          {card.about.map((item, idx) => (
            <View key={idx} style={styles.aboutmeparent}>
              <Text style={styles.aboutmechild}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.bioContain}>
          <Text style={styles.labels}>Interests</Text>
          <Text style={styles.bio2}>{card.interests}</Text>
        </View>

        <View style={styles.bioContain}>
          <Text style={styles.labels}>Hobbies</Text>
          <Text style={styles.bio2}>{card.hobbies}</Text>
        </View>

        <View style={styles.bioContain}>
          <Text style={styles.labels}>Looking For</Text>
          <Text style={styles.bio2}>{card.lookingFor}</Text>
        </View>

        {isTopCard && ( // for the visual feedbacks when swiping.. yung like and x na nagaappear
          <>
            <Animated.View style={[styles.overlay, styles.likeOverlay, { opacity: likeOpacity }]}>
              <Text style={styles.overlayText}><AntDesign name="check" size={24} color="green" /></Text>
            </Animated.View>
            <Animated.View style={[styles.overlay, styles.nopeOverlay, { opacity: nopeOpacity }]}>
              <Text style={styles.overlayText}><AntDesign name="close" size={24} color="red" /></Text>
            </Animated.View>
          </>
        )}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 150 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={{ fontFamily: 'HelveticaNeueHeavy', fontSize: 30 }}>Notifications</Text>
          <Text style={{ fontFamily: 'HelveticaNeueHeavy', color: '#F83758', fontSize: 15 }}>New Likes</Text>
          <Text style={{ fontStyle: 'italic', fontFamily: 'HelveticaNeueRoman', color: '#808080', fontSize: 15 }}>
            Swipe right to connect, left to pass!
          </Text>
          {/* Debug line */}
          <Text style={{ fontSize: 12, color: 'gray', display: 'none' }}>isSwiping: {isSwiping.current ? 'true' : 'false'}</Text>
        </View>

        <View style={{ minHeight: 500, alignItems: 'center', position: 'relative', marginBottom: 50 }}>
          {cards.length > 0 ? (
            cards.map((card, index) => renderCard(card, index))
          ) : (
            <Text style={{ fontFamily: 'HelveticaNeueRoman', fontSize: 15 }}>
              No more profiles to show!
            </Text>
          )}
        </View>
        
        {cards.length > 0 && (
        <View style={styles.common}>
          <Text style={styles.commonHeading}>Things we can bond over:</Text>
          <View style={styles.listCommon}>
            <View style={styles.itemCommon}><Text>Year</Text></View>
            <View style={styles.itemCommon}><Text>Course</Text></View>
          </View>
        </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    padding: 20,

  },
  header: {
    height: 150,
    padding: 20,
    width: '100%',
    gap: 2,
  },
  card: {
    width: 320,
    backgroundColor: '#FFD6EA',
    margin: 10,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#B3B3B3',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    position: 'absolute',
    top: 0,
  },
  nickname: {
    textAlign: 'center',
    fontFamily: 'HelveticaNeueHeavy',
    color: '#B3B3B3',
    fontSize: 20,
    paddingLeft: 5,
    paddingTop: 2,
  },
  age: {
    fontSize: 14,
    fontFamily: 'HelveticaNeueHeavy',
  },
  bioContain: {
    marginTop: 8,
    paddingBottom: 4,
    minHeight: 10,
    borderRadius: 7,
    width: 295,
    backgroundColor: '#ebebebff',
  },
  bio: {
    fontFamily: 'HelveticaNeueRoman',
    color: '#B3B3B3',
    fontSize: 12,
    paddingTop: 6,
    paddingLeft: 2,
    paddingRight: 2,
    textAlign: 'center',
    lineHeight: 16,
  },
  labels: {
    fontFamily: 'HelveticaNeueHeavy',
    color: '#B3B3B3',
    fontSize: 20,
    paddingLeft: 5,
    paddingTop: 10,
  },
  aboutmecontain: {
    width: 295,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  aboutmeparent: {
    padding: 10,
    borderRadius: 18,
    marginLeft: 5,
    marginBottom: 10,
    backgroundColor: '#ebebebff',
  },
  aboutmechild: {
    fontFamily: 'HelveticaNeueHeavy',
    color: '#B3B3B3',
  },
  bio2: {
    fontFamily: 'HelveticaNeueRoman',
    color: '#B3B3B3',
    fontSize: 12,
    paddingTop: 6,
    paddingLeft: 10,
    paddingRight: 2,
    lineHeight: 16,
  },
  body: {
    flex: 1,
  },
  common: {
    width: 320,
    backgroundColor: 'white',
    margin: 10,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 20,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    gap: 5,

  },
  commonHeading: {
    fontFamily: 'HelveticaNeueHeavy',
    fontSize: 15,
  },
  listCommon: {
    flexDirection: 'row',
  },
  itemCommon: {
    backgroundColor: '#ebebebff',
    padding: 10,
    borderRadius: 50,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 7,
  },
  overlay: {
    position: 'absolute',
    top: 20,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  likeOverlay: {
    left: 20,
    borderColor: 'green',
  },
  nopeOverlay: {
    right: 20,
    borderColor: 'red',
  },
  overlayText: {
    fontFamily: 'HelveticaNeueHeavy',
    fontSize: 24,
    color: '#B3B3B3',
  },
});
