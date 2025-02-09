import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const InterviewItemCard = ({ interview, onRegenerateQuestions }) => {
    const router = useRouter();

   


    const onStart = () => {
        router.push('/dashboard/interview/' + interview?.mockId);
    };

    const onFeedbackPress = () => {
        router.push('/dashboard/interview/' + interview.mockId + "/feedback");
    };

    return (
        <div className="border shadow-sm rounded-sm p-3">
            <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
            <h2 className="text-sm text-gray-500">{interview?.jobExperience}</h2>
            <h2 className="text-xs text-gray-400">
                Created At: {interview?.createdAt}
            </h2>
            <div className="flex justify-between gap-5 mt-2">
                <Button size="sm" variant="outline" className="w-full" onClick={onFeedbackPress}>
                    Feedback
                </Button>
                <Button className="w-full" size="sm" onClick={onStart}>
                    Start
                </Button>
                <Button size="sm" variant="destructive" className="w-full" onClick={() => onRegenerateQuestions(interview.mockId)}>
                    Regenerate Questions
                </Button>
            </div>
        </div>
    );
};

export default InterviewItemCard;
