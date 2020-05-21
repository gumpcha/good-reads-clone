import { Subject } from 'rxjs';

const subject = new Subject();

export const messageService = {
	sendMessage: param =>
		subject.next({ type: param.type, message: param.message }),
	clearMessages: () => subject.next(),
	getMessage: () => subject.asObservable(),
};
