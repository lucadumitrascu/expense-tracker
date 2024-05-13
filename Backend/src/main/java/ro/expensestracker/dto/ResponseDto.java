package ro.expensestracker.dto;


public class ResponseDto {

    private String statusMessage;

    public ResponseDto(String statusMessage) {
        this.statusMessage = statusMessage;
    }

    public ResponseDto() {
    }

    public String getStatusMessage() {
        return statusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        this.statusMessage = statusMessage;
    }
}
