'use strict';

// Order is important
module.exports = {
	// Gold position awards
	Gold: require('./awards/gold'),
	DoubleGold: require('./awards/double-gold'),
	TripleGold: require('./awards/triple-gold'),
	QuadrupleGold: require('./awards/quadruple-gold'),

	// Silver position awards
	Silver: require('./awards/silver'),
	DoubleSilver: require('./awards/double-silver'),
	TripleSilver: require('./awards/triple-silver'),
	QuadrupleSilver: require('./awards/quadruple-silver'),

	// Bronze position awards
	Bronze: require('./awards/bronze'),
	DoubleBronze: require('./awards/double-bronze'),
	TripleBronze: require('./awards/triple-bronze'),
	QuadrupleBronze: require('./awards/quadruple-bronze'),

	// Non podium position awards
	ConsistentTwoAward: require('./awards/consistent-2'),
	ConsistentThreeAward: require('./awards/consistent-3'),
	ConsistentFourAward: require('./awards/consistent-4'),
	ConsistentFiveAward: require('./awards/consistent-5'),
	ConsistentSixAward: require('./awards/consistent-6'),

	// Podium awards
	PodiumAward: require('./awards/podium'),
	PodiumClimbingAward: require('./awards/podium-climbing'),

	// Time difference awards
	HalfTimeAward: require('./awards/half-time'),
	QuarterTimeAward: require('./awards/quarter-time'),
	DoubleTimeAward: require('./awards/double-time'),

	// Fast/slow time awards
	SubTwoMinutesAward: require('./awards/sub-120'),
	SubMinuteAward: require('./awards/sub-60'),
	SubFortyFiveSecondsAward: require('./awards/sub-45'),
	SubThirtySecondsAward: require('./awards/sub-30'),
	SubTwentySecondsAward: require('./awards/sub-20'),
	OverFiveMinutesAward: require('./awards/over-300'),
	OverTenMinutesAward: require('./awards/over-600'),
	NiceTryJoelAward: require('./awards/nice-try-joel'),

	// Date-specific awards
	AnniversaryAward: require('./awards/anniversary'),
	ChristmasAward: require('./awards/christmas'),
	ValentinesAward: require('./awards/valentines'),

	// Chaining awards
	ChainThreeAward: require('./awards/chain-3'),
	ChainFourAward: require('./awards/chain-4'),
	ChainFiveAward: require('./awards/chain-5'),
	ChainSixAward: require('./awards/chain-6'),

	// Play streak awards
	ThreeDayStreakAward: require('./awards/three-day-streak'),
	WeekStreakAward: require('./awards/week-streak'),
	MonthStreakAward: require('./awards/month-streak'),
	QuarterStreakAward: require('./awards/quarter-streak'),
	HolidayAward: require('./awards/holiday'),

	// Same time awards
	TwinningAward: require('./awards/twinning'),
	TripletingAward: require('./awards/tripleting'),
	QuadrupletingAward: require('./awards/quadrupleting'),
	QuintupletingAward: require('./awards/quintupleting'),
	Sextupleting: require('./awards/sextupleting'),
	TwinningInGoldAward: require('./awards/twinning-in-gold'),
	YinAndYangAward: require('./awards/yin-and-yang'),

	// Set number awards
	ArjunAward: require('./awards/arjun'),
	NiceAward: require('./awards/nice'),
	PiAward: require('./awards/pi'),
	BlazeAward: require('./awards/blaze'),
	DontPanicAward: require('./awards/dont-panic'),
	DentistAward: require('./awards/dentist'),
	TwoForTuesdayAward: require('./awards/two-for-tuesday'),
	FridayStreetAward: require('./awards/friday-street'),

	// Set number position streak awards
	BeastAward: require('./awards/beast'),
	EmergencyAward: require('./awards/emergency'),
	UnluckyForSomeAward: require('./awards/unlucky'),

	// Scrape time awards
	QuickDrawAward: require('./awards/quick-draw'),
	SlowAndSteady: require('./awards/slow-and-steady'),

	// Special awards
	GlitchAward: require('./awards/glitch')
};
