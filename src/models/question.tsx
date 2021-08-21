export interface Question {
	accepted: boolean;
	index: number;
	id: string;
	categoryIds: string;
	ownerId: string;
	title: string;
	difficultyLevel: string;
	answer: string;
	source: string;
	choice_Alpha?: string;
	choice_Beta?: string;
	choice_Gamma?: string;
	choice_Delta?: string;
	right_choice: number;
	hint: string;
}

function question(this: Question, info: Question) {
	this.accepted = info.accepted;
	this.index = info.index;
	this.id = info.id;
	this.categoryIds = info.categoryIds;
	this.ownerId = info.ownerId;
	this.title = info.title;
	this.difficultyLevel = info.difficultyLevel;
	this.answer = info.answer;
	this.source = info.source;
	this.choice_Alpha = info.choice_Alpha;
	this.choice_Beta = info.choice_Beta;
	this.choice_Gamma = info.choice_Gamma;
	this.choice_Delta = info.choice_Delta;
	this.right_choice = info.right_choice;
	this.index = info.index;
	this.hint = info.hint;
}

export default question;
