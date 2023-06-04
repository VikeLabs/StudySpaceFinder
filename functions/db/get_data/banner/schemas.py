from dataclasses import dataclass
from typing import Dict, List, Any


@dataclass
class MeetingTime:
    begin_time: str  # 0830
    building_description: str  # David Turpin Building
    category: str  # 01
    end_time: str  # 0950
    friday: bool
    meeting_schedule_type: str  # LEC | TUT | LAB | GLB
    meeting_type: str  # CLAS
    meeting_type_description: str  # Everyweek
    monday: bool
    room: str  # A111
    saturday: bool
    sunday: bool
    thursday: bool
    tuesday: bool
    wednesday: bool


@dataclass
class MeetingsFaculty:
    meeting_time: MeetingTime


@dataclass
class BannerSection:
    course_number: int  # 101
    subject: str  # MATH
    subject_description: str  # Math
    sequence_number: str  # A01
    schedule_type_description: str  # Lecture | Tutorial | Lab | Lecture Topic
    course_title: str  # Calculus II
    subject_course: str  # MATH101
    meetings_faculty: List[MeetingsFaculty]

    def to_dict(self):
        meeting_faculty = []
        for i in self.meetings_faculty:
            meeting_faculty.append({"meeting_time": i.meeting_time.__dict__})

        result = self.__dict__
        result["meetings_faculty"] = meeting_faculty
        return result

    @staticmethod
    def new(data: Dict[str, Any]) -> "BannerSection":
        course_number = data["courseNumber"]
        subject = data["subject"]
        subject_description = data["subjectDescription"]
        sequence_number = data["sequenceNumber"]
        schedule_type_description = data["scheduleTypeDescription"]
        course_title = data["courseTitle"]
        subject_course = data["subjectCourse"]

        meetings_faculties: List[MeetingsFaculty] = list()
        for i in data["meetingsFaculty"]:
            meeting_time = i["meetingTime"]
            begin_time = meeting_time["beginTime"]
            building_description = meeting_time["buildingDescription"]
            category = meeting_time["category"]
            end_time = meeting_time["endTime"]
            friday = meeting_time["friday"]
            meeting_schedule_type = meeting_time["meetingScheduleType"]
            meeting_type = meeting_time["meetingType"]
            meeting_type_description = meeting_time["meetingTypeDescription"]
            monday = meeting_time["monday"]
            room = meeting_time["room"]
            saturday = meeting_time["saturday"]
            sunday = meeting_time["sunday"]
            thursday = meeting_time["thursday"]
            tuesday = meeting_time["tuesday"]
            wednesday = meeting_time["wednesday"]

            meeting_faculty = MeetingsFaculty(
                meeting_time=MeetingTime(
                    begin_time,
                    building_description,
                    category,
                    end_time,
                    friday,
                    meeting_schedule_type,
                    meeting_type,
                    meeting_type_description,
                    monday,
                    room,
                    saturday,
                    sunday,
                    thursday,
                    tuesday,
                    wednesday,
                )
            )
            meetings_faculties.append(meeting_faculty)

        return BannerSection(
            course_number,
            subject,
            subject_description,
            sequence_number,
            schedule_type_description,
            course_title,
            subject_course,
            meetings_faculty=meetings_faculties,
        )


@dataclass
class Term:
    code: str
    description: str
