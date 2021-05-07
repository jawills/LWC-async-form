import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AsyncTest extends LightningElement {
    @api recordId
    base = true;
    loading;
    finished;

    sleep(ms, email) {
        return new Promise((resolve, reject) => setTimeout(() => {
            if(email.endsWith('.com')){
                reject('Email cannot end with .com')
            }
            resolve()
        }, ms))
    }

    showToast(message) {
        const event = new ShowToastEvent({
            title: 'Error Saving Record',
            message: message,
            variant: 'error',
            mode: 'sticky'
        });
        this.dispatchEvent(event);
    }

    async onSubmitHandler(event){
        const form = this.template.querySelector('lightning-record-edit-form')
        this.base = false
        this.loading = true
        await this.sleep(2000, event.detail.fields['Email']).then(() => {
            form.submit(event.detail.fields);

            this.loading = false
            this.finished = true
        }).catch(error =>{
            this.showToast(error)
            this.base = true
            this.loading = false
        })
    }
}